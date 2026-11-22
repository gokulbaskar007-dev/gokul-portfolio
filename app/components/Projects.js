"use client";

import { useEffect, useRef } from "react";
import { PROJECTS } from "@/data/projects";

const domain = (u) => u.replace(/^https?:\/\//, "").replace(/\/$/, "");
const shotUrl = (u, n = 0) =>
  `https://s0.wp.com/mshots/v1/${encodeURIComponent(u)}?w=1280&h=800${n ? `&r=${n}` : ""}`;
const shotFallback = (u) =>
  `https://image.thum.io/get/width/1280/crop/800/noanimate/${u}`;

function ProjectCard({ project, onPreview }) {
  const imgRef = useRef(null);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;
    const url = project.url;
    let tries = 0;
    let timer = null;

    const load = () => {
      img.src = project.image && tries === 0 ? project.image : shotUrl(url, tries);
    };

    const handleLoad = () => {
      if (img.naturalWidth < 900 && tries < 4) {
        tries++;
        timer = setTimeout(load, 3500);
        return;
      }
      img.classList.add("ok");
    };

    const handleError = () => {
      if (project.image && tries === 0) {
        tries++;
        load();
        return;
      }
      if (!img.dataset.fb) {
        img.dataset.fb = "1";
        img.src = shotFallback(url);
      }
    };

    img.addEventListener("load", handleLoad);
    img.addEventListener("error", handleError);
    load();

    return () => {
      clearTimeout(timer);
      img.removeEventListener("load", handleLoad);
      img.removeEventListener("error", handleError);
    };
  }, [project]);

  return (
    <article className="proj rv">
      <div className="shot">
        <div className="shot__bar">
          <span />
          <span />
          <span />
          <em>{domain(project.url)}</em>
          <b className="shot__live">Live</b>
        </div>
        <div className="shot__view">
          <img
            ref={imgRef}
            alt={`${project.name} — live website ${domain(project.url)}`}
            loading="lazy"
          />
          <div className="shot__overlay">
            <button type="button" onClick={() => onPreview(project.url)}>
              Live preview
            </button>
            <a href={project.url} target="_blank" rel="noopener noreferrer">
              Visit ↗
            </a>
          </div>
        </div>
      </div>
      <div className="proj__tags">
        {project.tags.map((t) => (
          <span className="pill" key={t}>
            {t}
          </span>
        ))}
      </div>
      <div className="proj__row">
        <div>
          <h3>{project.name}</h3>
          <p>{project.kind}</p>
        </div>
        <a
          className="arrow"
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${project.name}`}
        >
          →
        </a>
      </div>
    </article>
  );
}

export default function Projects({ onPreview }) {
  // Only render projects with a valid URL (never show placeholder cards on live site)
  const activeProjects = PROJECTS.filter((p) => Boolean(p.url));

  return (
    <section className="section" id="projects" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="head">
          <div>
            <span className="eyebrow rv">Portfolio</span>
            <h2 className="h2 rv">
              My Latest <span className="hl">Projects</span>
            </h2>
          </div>
          <a
            href="https://github.com/gokulbaskar007-dev"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--light rv"
          >
            GitHub <i>↗</i>
          </a>
        </div>
        <div className="projects" id="projects-grid">
          {activeProjects.map((p) => (
            <ProjectCard key={p.url} project={p} onPreview={onPreview} />
          ))}
        </div>
      </div>
    </section>
  );
}

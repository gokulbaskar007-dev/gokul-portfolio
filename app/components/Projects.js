import { getImageProps } from "next/image";
import { PROJECTS } from "@/data/projects";
import ProjectPreviews, { ProjectPreviewButton } from "./ProjectPreviews";
import RemoteProjectScreenshot from "./RemoteProjectScreenshot";

const screenshotSizes =
  "(max-width: 760px) calc(90vw - 36px), (max-width: 1311px) calc(45vw - 49px), 541px";

function ProjectCard({ project }) {
  const host = new URL(project.url).host;
  const imageAlt = `${project.name} website screenshot`;
  const screenshot = project.image
    ? getImageProps({ src: project.image, alt: imageAlt, fill: true, sizes: screenshotSizes }).props
    : null;

  return (
    <article className="proj rv">
      <div className="shot">
        <div className="shot__bar">
          <span />
          <span />
          <span />
          <em>{host}</em>
          <b className="shot__live">Live</b>
        </div>
        <div className="shot__view">
          {screenshot ? (
            <img {...screenshot} />
          ) : (
            <RemoteProjectScreenshot url={project.url} alt={imageAlt} />
          )}
          <div className="shot__overlay">
            <ProjectPreviewButton url={project.url} name={project.name} />
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

export default function Projects() {
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
        <ProjectPreviews>
          <div className="projects" id="projects-grid">
            {activeProjects.map((project) => (
              <ProjectCard key={project.url} project={project} />
            ))}
          </div>
        </ProjectPreviews>
      </div>
    </section>
  );
}

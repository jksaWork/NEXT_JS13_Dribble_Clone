import Image from "next/image";
import { fetchAllProjects } from "@/lib/actions";
import { ProjectInterface } from "@/common.types";
import { ProjectCard, Categories, LoadMore } from "@/components";
interface ProjectSerarchInterface {
  projectsSearch: {
    edges: { node: ProjectInterface }[];
    pageInfo: {
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      startCursor: string;
      endCursor: string;
    };
  };
}

type SearchParmasProps = {
  searchParams: {
    category?: string;
    endcursor?: string;
  };
};
export default async function Home({
  searchParams: { category, endcursor },
}: SearchParmasProps) {
  const data = (await fetchAllProjects(category, endcursor)) as ProjectSerarchInterface;
  const projectsToDisplay = data?.projectsSearch?.edges || [];
  console.log(data.projectsSearch, projectsToDisplay);

  if (projectsToDisplay.length === 0) {
    return (
      <section className="flexStart flex-col paddings">
        {/* <Categories /> */}

        <p className="no-result-text text-center">
          No projects found, go create some first.
        </p>
      </section>
    );
  }

  return (
    <>
      <section className="projects-grid px-3 pt-10 container mx-auto">
        {projectsToDisplay.map(({ node }, elx) => (
          <ProjectCard
            key={node?.id + elx}
            id={node?.id}
            image={node?.image}
            title={node?.title}
            name={node?.createdBy.name}
            avatarUrl={node?.createdBy.avatarUrl}
            userId={node?.createdBy.id}
          />
        ))}
        <LoadMore
          startCursor={data?.projectsSearch?.pageInfo?.startCursor}
          endCursor={data?.projectsSearch?.pageInfo?.endCursor}
          hasPreviousPage={data?.projectsSearch?.pageInfo?.hasPreviousPage}
          hasNextPage={data?.projectsSearch?.pageInfo.hasNextPage}
        />
      </section>
    </>
  );
}

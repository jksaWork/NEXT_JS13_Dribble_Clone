import { ProjectInterface } from "@/common.types";
import ProjectForm from "@/components/ProjectForm";
import { getPorjcetDetails } from "@/lib/actions";
import { getServerComponents } from "@/lib/session";
import { useSession } from "next-auth/react";

import { useEffect } from "react";
const EditProject = async ({ params: { id } }: any) => {
  // let { data: session } = useSession();
  const session = await getServerComponents();
  const data = (await getPorjcetDetails(id)) as {
    projects: ProjectInterface;
  };
  console.log(data);
  return (
    <div className="mt-[30px] xl:w-[1000px] mx-auto">
      <h3 className="text-4xl font-bold mb-10 mx-3"> Create Project</h3>
      <ProjectForm type="edit" session={session!} project={data.projects} />
    </div>
  );
};

export default EditProject;

// "use client";
import { ProjectInterface } from "@/common.types";
import ProjectForm from "@/components/ProjectForm";
import { getPorjcetDetails } from "@/lib/actions";
import { getServerComponents } from "@/lib/session";
import { useSession } from "next-auth/react";
import { useRouter, redirect } from "next/navigation";
import { useEffect } from "react";
interface ParamsType {
  params: { id: string };
}
const CreateProject = async ({ params: { id } }: ParamsType) => {
  const route = useRouter();
  const session = await getServerComponents();

  return (
    <div className="mt-[30px] xl:w-[1000px] mx-auto">
      <h3 className="text-4xl font-bold mb-10 mx-3"> Create Project</h3>
      <ProjectForm type="create" session={session!} />
    </div>
  );
};

export default CreateProject;

import ProjectForm from "@/components/ProjectForm";
import { getServerComponents } from "@/lib/session";

interface ParamsType {
  params: { id: string };
}
async function Page({ params: { id } }: ParamsType) {
  const session = await getServerComponents();

  return (
    <div className="mt-[30px] xl:w-[1000px] mx-auto">
      <h3 className="text-4xl font-bold mb-10 mx-3"> Create Project</h3>
      <ProjectForm type="create" session={session!} />
    </div>
  );
}

export default Page;

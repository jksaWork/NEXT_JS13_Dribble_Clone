import ProjectForm from "@/components/ProjectForm";

function page() {
  return (
    <div className="mt-[30px] w-[1000px] mx-auto">
      <h3 className="text-4xl font-bold"> Create Project</h3>
      <ProjectForm type="create" />
    </div>
  );
}

export default page;

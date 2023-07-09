import { getServerComponents } from "@/lib/session";
import React from "react";
import { getPorjcetDetails } from "@/lib/actions";
import { ProjectInterface } from "@/common.types";
import RelatedProjects from "@/components/RelatedProjects";
import Image from "next/image";
import Link from "next/link";
import ProjectActions from "@/components/ProjectAction";
interface ParamsType {
  params: { id: string };
}

async function index({ params: { id } }: ParamsType) {
  const session = await getServerComponents();
  const data = (await getPorjcetDetails(id)) as {
    projects: ProjectInterface;
  };

  if (!data?.projects) return <> Erro When Fretch Post Data</>;
  const profile = data?.projects.createdBy;
  const projectDetails = data.projects;
  console.log(profile);
  return (
    <div className="mt-[70px] container mx-auto flex flex-col gap-2">
      {/*  Header Info */}
      <div className="flex items-center justify-between">
        <div className="flex gap-5 items-center">
          <div className="image_container h-70px  w-[70px]">
            <Image
              width={100}
              height={100}
              alt="Log Image"
              src={profile.avatarUrl}
              className="rounded-full"
            />
          </div>
          <div className="detailsContaier flex flex-col">
            <div className="text-2xl font-[500]">{profile.name}</div>
            <div className="text-xl font-[300]">{profile.email}</div>
          </div>
        </div>
        {session?.user?.email === projectDetails?.createdBy?.email && (
          <div className="flex justify-end items-center gap-2">
            <ProjectActions projectId={projectDetails?.id} />
          </div>
        )}
      </div>
      <div className="Main_Image_Container max-w-[95%] max-h-auto mx-auto   w-[1000px] rounded-xl ">
        <Image
          alt="Main Image "
          src={data?.projects.image}
          width={1000}
          height={1000}
        />
      </div>
      <section className="flexCenter flex-col mt-5">
        <p className="max-w-5xl text-xl font-normal">
          {projectDetails?.description}
        </p>

        <div className="flex flex-wrap mt-2 gap-5">
          <Link
            href={projectDetails?.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="flexCenter gap-2 tex-sm font-medium text-primary-purple"
          >
            🖥 <span className="underline">Github</span>
          </Link>
          <Image src="/dot.svg" width={4} height={4} alt="dot" />
          <Link
            href={projectDetails?.livesite}
            target="_blank"
            rel="noreferrer"
            className="flexCenter gap-2 tex-sm font-medium text-primary-purple"
          >
            🚀 <span className="underline">Live Site</span>
          </Link>
        </div>
      </section>
      <section className="flexCenter w-full gap-8 mt-28">
        <span className="w-full h-0.5 bg-light-white-200" />
        <Link href={"/"} className="min-w-[82px] h-[82px]">
          <Image
            src={projectDetails?.createdBy?.avatarUrl}
            className="rounded-full"
            width={82}
            height={82}
            alt="profile image"
          />
        </Link>
        <span className="w-full h-0.5 bg-light-white-200" />
      </section>
      {/* Image INfo */}

      {/* Erlated Product Section Section */}
      <RelatedProjects
        userId={projectDetails?.createdBy?.id}
        projectId={projectDetails?.id}
      />
    </div>
  );
}

export default index;

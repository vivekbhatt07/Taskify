import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Delete, Edit } from "@mui/icons-material";
import { ModalProvider, TolltipIconAction } from "../../../../components";
import ProjectForm from "../../../../components/ProjectForm";
import { useProject } from "../../../../context";

const ProjectCard = ({ projectData }) => {
  const navigate = useNavigate();
  const { deleteProjectHandler } = useProject();

  const [isEditProjectModalOpen, setIsEditProjectModalOpen] =
    useState<Boolean>(false);

  const openEditProjectModal = () => setIsEditProjectModalOpen(true);
  const closeEditProjectModal = () => setIsEditProjectModalOpen(false);
  return (
    <div
      className="border border-[#ddd] p-4 rounded-lg cursor-pointer flex flex-col gap-4"
      // onClick={() => navigate(`/${projectData._id}`)}
    >
      <div className="flex flex-col gap-2">
        <h3>{projectData.title}</h3>
        <p>{projectData.description}</p>
      </div>
      <div className="flex justify-between">
        <TolltipIconAction
          position="bottom"
          title="Delete Project"
          onClick={(e) => {
            e.stopPropagation();
            deleteProjectHandler(projectData._id);
          }}
        >
          <Delete />
        </TolltipIconAction>
        <ModalProvider
          isOpen={isEditProjectModalOpen}
          title="Edit Project"
          OpenAction={
            <TolltipIconAction
              position="top"
              title="Edit Project"
              onClick={(e) => {
                e.stopPropagation();
                openEditProjectModal();
              }}
            >
              <Edit />
            </TolltipIconAction>
          }
          closeModal={closeEditProjectModal}
        >
          <ProjectForm
            closeAction={(e) => {
              closeEditProjectModal(e);
            }}
            projectData={projectData}
            isEdit
          />
        </ModalProvider>
      </div>
    </div>
  );
};

export default ProjectCard;

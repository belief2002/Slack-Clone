interface WorkspaceIdPageProps {
  params: {
    workspaceId: string;
  };
}
const workspaceIdPage = ({ params }: WorkspaceIdPageProps) => {
  return <div>
    
    ID: {params.workspaceId}
  </div>;
};

export default workspaceIdPage;

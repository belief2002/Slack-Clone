"use client";

import { useGetWorspace } from "@/features/workspaces/api/use-get-workspace";
import { useWorkspaceId } from "@/hooks/use-workspace-id";

// interface WorkspaceIdPageProps {
//   params: {
//     workspaceId: string;
//   };
// }
const workspaceIdPage = () => {
  const workspaceId = useWorkspaceId();
  const { data } = useGetWorspace({ id: workspaceId });
  return (<div>
    DATA: {JSON.stringify(data)}
    </div>
    );
};

export default workspaceIdPage;

import Loader from "../components/ui/Loader";
import { setup } from "../components/utils/axios";
import useCheckIsAuthorized from "../http/auth/useGetAuhtorizedUser";

type Props = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: Props) {
  const { isLoading } = useCheckIsAuthorized();

  if (isLoading)
    return (
      <div>
        <Loader />
      </div>
    );

  return children;
}

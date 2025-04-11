import Loader from "../components/ui/Loader";
import useCheckIsAuthorized from "../http/auth/useGetAuhtorizedUser";

type Props = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: Props) {
  const { isLoading } = useCheckIsAuthorized();

  if (isLoading) return <Loader />;
  return <>{children}</>;
}

import error from "../../assets/404.png";
import CommonPage from "./CommonPage";
const ErrorPage = () => {
  return (<>
  <CommonPage
        image={error}
        heading="Oops! page not found"
        para="Ut consequat ac tortor eu vehicula. Aenean accumsan purus eros. Maecenas sagittis tortor at metus mollis"
        btn3="Back to Home"
        />
</>
  )
}

export default ErrorPage




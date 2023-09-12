
import { Backdrop, CircularProgress } from "@mui/material";

type PropTypes = {
  appLoading?: boolean
};
const Loading = (props: PropTypes) => {
  const { appLoading = false } = props

  if(!appLoading)
    return <CircularProgress />;

  return (
    <Backdrop open={true} sx={{ zIndex: 9999 }}>
      <CircularProgress />
    </Backdrop>
  )
};


export default Loading;
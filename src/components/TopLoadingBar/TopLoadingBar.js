import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import "./TopLoadingBar.css";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));
export function TopLoadingBar() {
  const classes = useStyles();
  const myClass = classes.root + " horizontal-top-loader ";
  return (
    <div className={myClass}>
      <LinearProgress color="secondary" />
    </div>
  );
}

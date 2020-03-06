import React, { ReactElement } from "react";
import css from "./LabelBordered.scss";

interface LabelBorderedProps {
  children: ReactElement;
}

const LabelBordered = ({ children }: LabelBorderedProps): ReactElement => (
  <div className={css["label-bordered"]}>{children}</div>
);

export default LabelBordered;

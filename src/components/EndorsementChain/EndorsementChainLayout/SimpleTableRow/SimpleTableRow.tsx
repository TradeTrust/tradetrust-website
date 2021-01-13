import React, { FunctionComponent } from "react";
import { EndorsementJourney } from "../EndorsementJourney";

interface SimpleTableRowProps {
  index: number;
  date?: string;
  actionTitle: string;
  displayDashHead: boolean;
  displayDot: boolean;
  displayDashTail: boolean;
}

export const SimpleTableRow: FunctionComponent<SimpleTableRowProps> = ({
  index,
  date,
  actionTitle,
  displayDashHead,
  displayDot,
  displayDashTail,
}) => {
  return (
    <tr className="table-row" key={index}>
      <td className="table-cell">
        <div className="action-title">{actionTitle}</div>
        {date && (
          <div className="date" data-testid="date">
            {date}
          </div>
        )}
      </td>
      <td className="table-cell" colSpan={2}>
        <EndorsementJourney
          displayDashHead={displayDashHead}
          displayDot={displayDot}
          displayDashTail={displayDashTail}
        />
      </td>
    </tr>
  );
};

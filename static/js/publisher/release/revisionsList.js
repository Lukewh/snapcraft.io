import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import distanceInWords from "date-fns/distance_in_words_strict";
import format from "date-fns/format";

import DevmodeIcon from "./devmodeIcon";
import { UNASSIGNED } from "./constants";

export default class RevisionsList extends Component {
  revisionSelectChange(revision) {
    this.props.selectRevision(revision);
  }

  renderRows(revisions) {
    return revisions.map(revision => {
      const uploadDate = new Date(revision.created_at);
      const isSelected = this.props.selectedRevisions.includes(
        revision.revision
      );
      const isDisabled =
        !isSelected &&
        revision.architectures.some(
          arch =>
            this.props.releasedChannels[UNASSIGNED] &&
            this.props.releasedChannels[UNASSIGNED][arch]
        );

      return (
        <tr key={revision.revision} className={isDisabled ? "is-disabled" : ""}>
          <td>
            <input
              type="checkbox"
              checked={isSelected}
              id={`${this.props.idPrefix}-revision-check-${revision.revision}`}
              onChange={this.revisionSelectChange.bind(this, revision)}
            />
            <label
              className="u-no-margin--bottom"
              htmlFor={`${this.props.idPrefix}-revision-check-${
                revision.revision
              }`}
            >
              {revision.revision}
            </label>
          </td>
          <td>
            <DevmodeIcon revision={revision} showTooltip={true} />
          </td>
          <td>{revision.version}</td>
          {this.props.showArchitectures && (
            <td>{revision.architectures.join(", ")}</td>
          )}
          {this.props.showChannels && <td>{revision.channels.join(", ")}</td>}
          <td className="u-align--right">
            <span
              className="p-tooltip p-tooltip--btm-center"
              aria-describedby={`revision-uploaded-${revision.revision}`}
            >
              {distanceInWords(new Date(), uploadDate, { addSuffix: true })}
              <span
                className="p-tooltip__message u-align--center"
                role="tooltip"
                id={`revision-uploaded-${revision.revision}`}
              >
                {format(uploadDate, "YYYY-MM-DD HH:mm")}
              </span>
            </span>
          </td>
        </tr>
      );
    });
  }

  onCloseClick(event) {
    event.preventDefault();
    this.props.closeRevisionsList();
  }

  render() {
    return (
      <Fragment>
        <div>
          <h4 className="u-float--left">
            {this.props.title ? this.props.title : "Revisions available"}
          </h4>
          <a
            style={{ marginTop: "0.5rem" }}
            href="#"
            onClick={this.onCloseClick.bind(this)}
            className="p-icon--close u-float--right"
          />
        </div>
        <table className="p-revisions-list">
          <thead>
            <tr>
              <th className="col-has-checkbox" width="100px" scope="col">
                Revision
              </th>
              <th width="20px" />
              <th scope="col">Version</th>
              {this.props.showArchitectures && (
                <th scope="col">Architecture</th>
              )}
              {this.props.showChannels && <th scope="col">Channels</th>}
              <th scope="col" className="u-align--right">
                Submission date
              </th>
            </tr>
          </thead>
          <tbody>{this.renderRows(this.props.revisions)}</tbody>
        </table>
      </Fragment>
    );
  }
}

RevisionsList.propTypes = {
  idPrefix: PropTypes.string,
  revisions: PropTypes.array.isRequired,
  selectedRevisions: PropTypes.array.isRequired,
  releasedChannels: PropTypes.object.isRequired,
  selectRevision: PropTypes.func.isRequired,
  showChannels: PropTypes.bool,
  showArchitectures: PropTypes.bool,
  title: PropTypes.string,
  closeRevisionsList: PropTypes.func.isRequired
};

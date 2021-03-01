import "./index.css";
import React, { useEffect, useState } from "react";
import { get } from "lodash";
import { boookingConfirmationKeys } from "./jsonKeys";

const BookingConfirmationRenderer = (props: any) => {
  const {
    doc: { additionalData },
  } = props;
  const [extraFields, setExtraFields] = useState({});

  useEffect(() => {
    const extraFieldSet: any = {};
    Object.keys(additionalData).forEach((key: string) => {
      if (!boookingConfirmationKeys.includes(key)) {
        extraFieldSet[key] = additionalData[key];
      }
    });
    setExtraFields(extraFieldSet);
  }, [additionalData]);

  const drawExtraField = () => {
    Object.keys(extraFields).map((key: string, keyIndex: number) => {
      const value: any = get(extraFields, key, "");
      if (typeof value === "string" || typeof value === "number") {
        return (
          <tr key={keyIndex}>
            <td colSpan={2}>
              <label>{key}</label>
            </td>
            <td colSpan={2}>
              <p>{value || `No value`}</p>
            </td>
          </tr>
        );
      } else if (typeof value === "object" || value.isArray()) {
        return (
          <tr key={keyIndex}>
            <td colSpan={2}>
              <label className="label">{key}</label>
            </td>
            <td colSpan={2}>
              <pre>{JSON.stringify(value, undefined, 2)}</pre>
            </td>
          </tr>
        );
      } else {
        return null;
      }
    });
  };

  return (
    <table className="custom-template-renderer-table">
      <tbody>
        {/* Document type heading */}
        <tr>
          <td colSpan={4}>
            <h3 className="doc-type">Booking confirmation</h3>
          </td>
        </tr>
        {/* End of Document type heading */}

        {/* Booking number and Booking date */}
        <tr>
          <td colSpan={3}>
            <label className="label">Booking Number</label>
            <p>{get(additionalData, "BookingNumber") || `No BookingNumber`}</p>
          </td>
          <td>
            <label className="label">Booking Date</label>
            <p>{get(additionalData, "BookingDate") || `No BookingDate`}</p>
          </td>
        </tr>
        {/* End of Booking number and Booking date */}

        {/* Name & Address of Partners involved */}
        <tr>
          <td colSpan={4}>
            <label>
              <strong>1. Name & Address of Partners involved</strong>
            </label>
          </td>
        </tr>

        <tr>
          <td>
            <label className="label">Shipper</label>
            <p>{get(additionalData, "Shipper") || `No name`}</p>
            <p>{get(additionalData, "ShipperAddress") || `No address`}</p>
            <p>Tel: {get(additionalData, "ContactInformation.ShipperContact") || `No contact`}</p>
            <p>Fax: {get(additionalData, "ContactInformation.ShipperFax") || `No fax`}</p>
          </td>
          <td>
            <label className="label">Consignee</label>
            <p>{get(additionalData, "Consignee") || `No name`}</p>
            <p>{get(additionalData, "ConsigneeAddress") || `No address`}</p>
            <p>Tel: {get(additionalData, "ContactInformation.ConsigneeContact") || `No contact`}</p>
            <p>Fax: {get(additionalData, "ContactInformation.ConsigneeFax") || `No fax`}</p>
          </td>
          <td colSpan={2}>
            <label className="label">Notify Party</label>
            <p>{get(additionalData, "NotifyParty") || `No name`}</p>
            <p>{get(additionalData, "NotifyPartyAddress") || `No address`}</p>
            <p>Tel: {get(additionalData, "ContactInformation.NotifyContact") || `No contact`}</p>
            <p>Fax: {get(additionalData, "ContactInformation.NotifyFax") || `No fax`}</p>
          </td>
        </tr>
        {/* End of Name & Address of Partners involved */}

        {/* Consignment details */}
        <tr>
          <td colSpan={4}>
            <label>
              <strong>2. Consignment details</strong>
            </label>
          </td>
        </tr>

        <tr>
          <td colSpan={2}>
            <label className="label">Commodity Description</label>
            <p>{get(additionalData, "CommodityDescription") || `No CommodityDescription`}</p>
          </td>
          <td colSpan={2}>
            <label className="label">Gross Weight</label>
            <p>
              {get(additionalData, "GrossWeight.Value") || `Value`} {get(additionalData, "GrossWeight.Unit") || `Unit`}
            </p>
          </td>
        </tr>

        <tr>
          <td colSpan={2}>
            <label className="label">Service Type</label>
            <p>{get(additionalData, "ServiceType") || `No ServiceType`}</p>
          </td>
          <td colSpan={2}>
            <label className="label">Carrier Name</label>
            <p>{get(additionalData, "CarrierName") || `No CarrierName`}</p>
          </td>
        </tr>

        <tr>
          <td colSpan={2}>
            <label className="label">Cut Off</label>
            <p>
              VGMSubmissionTimeline: {get(additionalData, "CutOff.VGMSubmissionTimeline") || `No VGMSubmissionTimeline`}
            </p>
            <p>SISubmission: {get(additionalData, "CutOff.SISubmission") || `No SISubmission`}</p>
            <p>Date: {get(additionalData, "CutOff.Date") || `No Date`}</p>
            <p>Time: {get(additionalData, "CutOff.Time") || `No Time`}</p>
          </td>
          <td colSpan={2}>
            <label className="label">Measurement</label>
            <p>{get(additionalData, "Measurement") || `No Measurement`}</p>
          </td>
        </tr>

        <tr>
          <td>
            <label>Service Contract Number</label>
          </td>
          <td>
            <p>{get(additionalData, "ServiceContractNumber") || `No ServiceContractNumber`}</p>
          </td>
          <td>
            <label>HS Code</label>
          </td>
          <td>
            <p>{get(additionalData, "HSCode") || `No HSCode`}</p>
          </td>
        </tr>

        <tr>
          <td>
            <label>Container Yard</label>
          </td>
          <td>
            <p>{get(additionalData, "ContainerYard") || `No ContainerYard`}</p>
          </td>
          <td>
            <label>CFS Address</label>
          </td>
          <td>
            <p>{get(additionalData, "CFS_Address") || `No CFS_Address`}</p>
          </td>
        </tr>
        {/* End of Consignment details */}

        {/* Shipping information */}
        <tr>
          <td colSpan={4}>
            <label>
              <strong>3. Shipping information</strong>
            </label>
          </td>
        </tr>

        <tr>
          <td>
            <label>Origin Port</label>
          </td>
          <td>
            <p>{get(additionalData, "ShippingInformation.OriginPort") || `No OriginPort`}</p>
          </td>
          <td>
            <label>Destination Port</label>
          </td>
          <td>
            <p>{get(additionalData, "ShippingInformation.DestinationPort") || `No DestinationPort`}</p>
          </td>
        </tr>

        <tr>
          <td>
            <label>Estimated time of Departure</label>
          </td>
          <td>
            <p>{get(additionalData, "ShippingInformation.ETD") || `No ETD`}</p>
          </td>
          <td>
            <label>Estimated time of arrival</label>
          </td>
          <td>
            <p>{get(additionalData, "ShippingInformation.ETA") || `No ETA`}</p>
          </td>
        </tr>

        <tr>
          <td>
            <label>Vessel (IMO)</label>
          </td>
          <td>
            <p>
              {get(additionalData, "Vessel") || `No Vessel`} ({get(additionalData, "IMO") || `No IMO`})
            </p>
          </td>
          <td>
            <label>Voyage Number</label>
          </td>
          <td>
            <p>{get(additionalData, "VoyageNumber") || `No VoyageNumber`}</p>
          </td>
        </tr>
        {/* End of Shipping information */}

        {/* Transhipment details */}
        <tr>
          <td colSpan={4}>
            <label>
              <strong>4. Transhipment details</strong>
            </label>
          </td>
        </tr>

        <tr>
          <td>
            <label>Port & Next Port</label>
          </td>
          <td>
            <label>Vessel (IMO)</label>
          </td>
          <td>
            <label>ETD</label>
          </td>
          <td>
            <label>ETA</label>
          </td>
        </tr>

        {get(additionalData, "TranshipmentInformation", []).map((tItem: any, tIndex: number) => {
          return (
            <tr key={tIndex}>
              <td>
                <p>Port: {get(tItem, "TSPort") || "No Port"}</p>
                <p>Next Port: {get(tItem, "TSNextPort") || "No NextPort"}</p>
              </td>
              <td>
                <p>
                  {get(tItem, "TSVessel") || "No Vessel"} ({get(tItem, "TSVesselIMO") || "No VesselIMO"})
                </p>
              </td>
              <td>
                <p>{get(tItem, "TSETD") || "No ETD"}</p>
              </td>
              <td>
                <p>{get(tItem, "TSETA") || "No ETA"}</p>
              </td>
            </tr>
          );
        })}
        {/* End of Transhipment details */}

        {/* Containers */}
        <tr>
          <td colSpan={4}>
            <label>
              <strong>5. Container information&nbsp;&nbsp;</strong>
              <i>Total {get(additionalData, "NumberOfContainers") || 1} container(s)</i>
            </label>
          </td>
        </tr>

        <tr>
          <td>
            <label>Container Number & Carrier Seal Number</label>
          </td>
          <td>
            <label>ContainerType</label>
          </td>
          <td>
            <label>Weight</label>
          </td>
          <td>
            <label>Volume</label>
          </td>
        </tr>

        {get(additionalData, "Containers", []).map((cItem: any, cIndex: number) => {
          return (
            <tr key={cIndex}>
              <td>
                <p>Container No.: {get(cItem, "ContainerNumber") || `No ContainerNumber`}</p>
                <p>Carrier Seal No.: {get(cItem, "CarrierSealNumber") || `No CarrierSealNumber`}</p>
              </td>
              <td>
                <p>{get(cItem, "ContainerType") || `No ContainerType`}</p>
              </td>
              <td>
                <p>
                  {get(cItem, "Weight.Value") || `No Value`} {get(cItem, "Weight.Unit") || `No Unit`}
                </p>
              </td>
              <td>
                <p>
                  {get(cItem, "Volume.Value") || `No Value`} {get(cItem, "Volume.Unit") || `No Unit`}
                </p>
              </td>
            </tr>
          );
        })}
        {/* End of Containers */}

        {/* Extra document information */}
        {Object.keys(extraFields).length > 0 && (
          <React.Fragment>
            <tr>
              <td colSpan={4}>
                <label>
                  <strong>6. Extra document information&nbsp;&nbsp;</strong>
                  <i>Total {get(additionalData, "NumberOfContainers") || 1} container(s)</i>
                </label>
              </td>
            </tr>
            {drawExtraField()}
          </React.Fragment>
        )}
        {/* End Extra document information */}
      </tbody>
    </table>
  );
};

export default BookingConfirmationRenderer;

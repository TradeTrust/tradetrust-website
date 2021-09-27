export const schema = {
  cooId: {
    type: "string",
    uiType: "withLabel",
    title: "CoO ID",
  },
  exporterDetails: {
    title: "Exporter Details",
    type: "object",
    uiType: "accordion",
    properties: {
      exportCountry: {
        title: "Export Country (Country Code)",
        type: "string",
        uiType: "withLabel",
      },
      exporterName: {
        title: "Exporter Name",
        type: "string",
        uiType: "withLabel",
      },
      exporterAddress: {
        title: "Exporter Address",
        type: "object",
        uiType: "withLabel",
        properties: {
          line1: {
            type: "string",
            uiType: "withoutLabel",
            title: "Address Line 1",
          },
          line2: {
            type: "string",
            uiType: "withoutLabel",
            title: "Address Line 2",
          },
          postalCode: {
            type: "string",
            uiType: "withoutLabel",
            title: "Postal Code",
          },
        },
      },
    },
  },
  importerDetails: {
    title: "Importer Details",
    type: "object",
    uiType: "accordion",
    properties: {
      importCountry: {
        title: "Import Country (Country Code)",
        type: "string",
        uiType: "withLabel",
      },
      importerName: {
        title: "Importer Name",
        type: "string",
        uiType: "withLabel",
      },
      importerAddress: {
        title: "Importer Address",
        type: "object",
        uiType: "withLabel",
        properties: {
          line1: {
            type: "string",
            uiType: "withoutLabel",
            title: "Address Line 1",
          },
          line2: {
            type: "string",
            uiType: "withoutLabel",
            title: "Address Line 2",
          },
          postalCode: {
            type: "string",
            uiType: "withoutLabel",
            title: "Postal Code",
          },
        },
      },
    },
  },
  descriptionOfGoods: {
    title: "Description of Goods",
    type: "object",
    uiType: "accordion",
    properties: {
      includedConsignments: {
        title: "Included Consignments",
        type: "string",
        uiType: "withLabel",
      },
      importerNameMarksAndNumber: {
        title: "Importer Name Marks and Number",
        type: "string",
        uiType: "withLabel",
      },
      numberAndKindOfPackage: {
        title: "Number and Kind of package; Description of Goods",
        type: "string",
        uiType: "withLabel",
      },
      hs: {
        title: "H.S",
        type: "string",
        uiType: "withLabel",
      },
      numberOfInvoice: {
        title: "Number of Invoice",
        type: "string",
        uiType: "withLabel",
      },
      dateOfInvoice: {
        title: "Date of Invoice",
        type: "string",
        uiType: "withLabel",
      },
      loadingBaseportLocationName: {
        title: "Loading Baseport Location Name",
        type: "string",
        uiType: "withLabel",
      },
      mainCarriageTransportMovementId: {
        title: "Main Carriage Transport Movement ID",
        type: "string",
        uiType: "withLabel",
      },
    },
  },
};

import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { AssetManagementTags } from "./index";
import { DOCUMENT_SCHEMA } from "../../../reducers/certificate";
import { TokenRegistryVersions } from "../../../constants";
import certificateReducer from "../../../reducers/certificate";
import * as tokenRegistryVersion from "../../../common/hooks/useTokenRegistryVersion";

// Mock the useTokenRegistryVersion hook
jest.mock("../../../common/hooks/useTokenRegistryVersion");
const mockUseTokenRegistryVersion = tokenRegistryVersion.useTokenRegistryVersion as jest.MockedFunction<
  typeof tokenRegistryVersion.useTokenRegistryVersion
>;

describe("AssetManagementTags", () => {
  const createMockStore = (documentSchema: any = null) => {
    return configureStore({
      reducer: {
        certificate: certificateReducer,
      },
      preloadedState: {
        certificate: {
          raw: null,
          rawModified: null,
          filename: "",
          providerOrSigner: null,
          tokenRegistryVersion: null,
          documentSchema,
          verificationPending: false,
          verificationStatus: null,
          verificationError: null,
          retrieveCertificateByActionState: "INITIAL" as const,
          retrieveCertificateByActionError: null,
          keyId: null,
        },
      },
    });
  };

  const renderWithProvider = (store: any, props: any = {}) => {
    return render(
      <Provider store={store}>
        <AssetManagementTags {...props} />
      </Provider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseTokenRegistryVersion.mockReturnValue(null);
  });

  describe("Transferable Document Tags", () => {
    it("should display Transferable and Negotiable tags when isTransferableDocument is true", () => {
      const store = createMockStore();
      renderWithProvider(store, { isTransferableDocument: true });

      expect(screen.getByText("Transferable")).toBeInTheDocument();
      expect(screen.getByText("Negotiable")).toBeInTheDocument();
    });

    it("should not display Transferable and Negotiable tags when isTransferableDocument is false", () => {
      const store = createMockStore();
      renderWithProvider(store, { isTransferableDocument: false });

      expect(screen.queryByText("Transferable")).not.toBeInTheDocument();
      expect(screen.queryByText("Negotiable")).not.toBeInTheDocument();
    });

    it("should not display Transferable and Negotiable tags when isTransferableDocument is undefined", () => {
      const store = createMockStore();
      renderWithProvider(store);

      expect(screen.queryByText("Transferable")).not.toBeInTheDocument();
      expect(screen.queryByText("Negotiable")).not.toBeInTheDocument();
    });
  });

  describe("Document Schema Tags", () => {
    it("should display OA tag when document schema is OA_V3", () => {
      const store = createMockStore(DOCUMENT_SCHEMA.OA_V3);
      renderWithProvider(store);

      expect(screen.getByText("OA")).toBeInTheDocument();
    });

    it("should display W3C VC V1.1 tag when document schema is W3C_VC_1_1", () => {
      const store = createMockStore(DOCUMENT_SCHEMA.W3C_VC_1_1);
      renderWithProvider(store);

      expect(screen.getByText("W3C VC V1.1")).toBeInTheDocument();
    });

    it("should display W3C VC V2.0 tag when document schema is W3C_VC_2_0", () => {
      const store = createMockStore(DOCUMENT_SCHEMA.W3C_VC_2_0);
      renderWithProvider(store);

      expect(screen.getByText("W3C VC V2.0")).toBeInTheDocument();
    });

    it("should not display any document schema tag when documentSchema is null", () => {
      const store = createMockStore(null);
      renderWithProvider(store);

      expect(screen.queryByText("OA")).not.toBeInTheDocument();
      expect(screen.queryByText("W3C VC V1.1")).not.toBeInTheDocument();
      expect(screen.queryByText("W3C VC V2.0")).not.toBeInTheDocument();
    });

    it("should not display OA_V2 tag as it uses same value as OA_V3", () => {
      const store = createMockStore(DOCUMENT_SCHEMA.OA_V2);
      renderWithProvider(store);

      // Since OA_V2 and OA_V3 have the same value "OA", this will show OA tag
      expect(screen.getByText("OA")).toBeInTheDocument();
    });
  });

  describe("Token Registry Version Tags", () => {
    it("should display TR V4 tag when token registry version is V4", () => {
      const store = createMockStore();
      mockUseTokenRegistryVersion.mockReturnValue(TokenRegistryVersions.V4);
      renderWithProvider(store);

      expect(screen.getByText("TR V4")).toBeInTheDocument();
    });

    it("should display TR V5 tag when token registry version is V5", () => {
      const store = createMockStore();
      mockUseTokenRegistryVersion.mockReturnValue(TokenRegistryVersions.V5);
      renderWithProvider(store);

      expect(screen.getByText("TR V5")).toBeInTheDocument();
    });

    it("should not display any token registry tag when version is null", () => {
      const store = createMockStore();
      mockUseTokenRegistryVersion.mockReturnValue(null);
      renderWithProvider(store);

      expect(screen.queryByText("TR V4")).not.toBeInTheDocument();
      expect(screen.queryByText("TR V5")).not.toBeInTheDocument();
    });
  });

  describe("Combined Scenarios", () => {
    it("should display all relevant tags for transferable W3C VC V2.0 document with TR V5", () => {
      const store = createMockStore(DOCUMENT_SCHEMA.W3C_VC_2_0);
      mockUseTokenRegistryVersion.mockReturnValue(TokenRegistryVersions.V5);
      renderWithProvider(store, { isTransferableDocument: true });

      expect(screen.getByText("Transferable")).toBeInTheDocument();
      expect(screen.getByText("Negotiable")).toBeInTheDocument();
      expect(screen.getByText("W3C VC V2.0")).toBeInTheDocument();
      expect(screen.getByText("TR V5")).toBeInTheDocument();
    });

    it("should display all relevant tags for transferable OA document with TR V4", () => {
      const store = createMockStore(DOCUMENT_SCHEMA.OA_V3);
      mockUseTokenRegistryVersion.mockReturnValue(TokenRegistryVersions.V4);
      renderWithProvider(store, { isTransferableDocument: true });

      expect(screen.getByText("Transferable")).toBeInTheDocument();
      expect(screen.getByText("Negotiable")).toBeInTheDocument();
      expect(screen.getByText("OA")).toBeInTheDocument();
      expect(screen.getByText("TR V4")).toBeInTheDocument();
    });

    it("should display only document schema tag for non-transferable W3C VC V1.1 document without token registry", () => {
      const store = createMockStore(DOCUMENT_SCHEMA.W3C_VC_1_1);
      mockUseTokenRegistryVersion.mockReturnValue(null);
      renderWithProvider(store, { isTransferableDocument: false });

      expect(screen.queryByText("Transferable")).not.toBeInTheDocument();
      expect(screen.queryByText("Negotiable")).not.toBeInTheDocument();
      expect(screen.getByText("W3C VC V1.1")).toBeInTheDocument();
      expect(screen.queryByText("TR V4")).not.toBeInTheDocument();
      expect(screen.queryByText("TR V5")).not.toBeInTheDocument();
    });

    it("should display no tags when no conditions are met", () => {
      const store = createMockStore(null);
      mockUseTokenRegistryVersion.mockReturnValue(null);
      const { container } = renderWithProvider(store, { isTransferableDocument: false });

      const tagsContainer = container.querySelector(".flex.flex-wrap.py-2.gap-2");
      expect(tagsContainer).toBeInTheDocument();
      expect(tagsContainer?.children).toHaveLength(0);
    });
  });

  describe("CSS Classes", () => {
    it("should apply correct CSS classes to Transferable and Negotiable tags", () => {
      const store = createMockStore();
      renderWithProvider(store, { isTransferableDocument: true });

      const transferableTag = screen.getByText("Transferable");
      const negotiableTag = screen.getByText("Negotiable");

      expect(transferableTag).toHaveClass(
        "bg-cerulean-300/[25%]",
        "text-cerulean-500",
        "rounded-full",
        "font-gilroy-bold"
      );
      expect(negotiableTag).toHaveClass(
        "bg-cerulean-300/[25%]",
        "text-cerulean-500",
        "rounded-full",
        "font-gilroy-bold"
      );
    });

    it("should apply correct CSS classes to OA tag", () => {
      const store = createMockStore(DOCUMENT_SCHEMA.OA_V3);
      renderWithProvider(store);

      const oaTag = screen.getByText("OA");
      expect(oaTag).toHaveClass("bg-cloud-100", "text-cloud-500", "rounded-full", "font-gilroy-bold");
    });

    it("should apply correct CSS classes to W3C VC tags", () => {
      const store = createMockStore(DOCUMENT_SCHEMA.W3C_VC_2_0);
      renderWithProvider(store);

      const w3cTag = screen.getByText("W3C VC V2.0");
      expect(w3cTag).toHaveClass("bg-tangerine-500/[24%]", "text-tangerine-500", "rounded-full", "font-gilroy-bold");
    });

    it("should apply correct CSS classes to TR V4 tag", () => {
      const store = createMockStore();
      mockUseTokenRegistryVersion.mockReturnValue(TokenRegistryVersions.V4);
      renderWithProvider(store);

      const trV4Tag = screen.getByText("TR V4");
      expect(trV4Tag).toHaveClass("bg-cloud-100", "text-cloud-500", "rounded-full", "font-gilroy-bold");
    });

    it("should apply correct CSS classes to TR V5 tag", () => {
      const store = createMockStore();
      mockUseTokenRegistryVersion.mockReturnValue(TokenRegistryVersions.V5);
      renderWithProvider(store);

      const trV5Tag = screen.getByText("TR V5");
      expect(trV5Tag).toHaveClass("bg-tangerine-500/[24%]", "text-tangerine-500", "rounded-full", "font-gilroy-bold");
    });
  });
});

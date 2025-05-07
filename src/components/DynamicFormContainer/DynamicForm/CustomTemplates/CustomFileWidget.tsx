import React, { ChangeEvent, FunctionComponent, useState, useRef, useEffect } from "react";
import { WidgetProps } from "@rjsf/core";
import { Upload } from "react-feather";

export const CustomFileWidget: FunctionComponent<WidgetProps> = ({
  id,
  autofocus,
  multiple,
  disabled,
  readonly,
  options,
  onChange,
}) => {
  interface fileData {
    dataURL: string;
    name: string;
    size: number;
    type: string;
  }

  const isMounted = useRef(true);
  const [filesMetadata, setFilesMetadata] = useState<any[]>([]);

  function processFile(file: File): Promise<fileData | DOMException> {
    const { name, size, type } = file;
    return new Promise((resolve, reject) => {
      const reader = new window.FileReader();
      reader.onerror = () => {
        reject(reader.error ?? "");
      };

      reader.onload = (event) => {
        resolve({
          dataURL: event?.target?.result,
          name,
          size,
          type,
        } as fileData);
      };
      reader.readAsDataURL(file);
    });
  }

  function processFiles(files: FileList): Promise<any[]> {
    return Promise.all([].map.call(files, processFile));
  }

  const FilesInfo = () => {
    if (filesMetadata.length === 0) {
      return null;
    }

    return (
      <ul className="file-info">
        {filesMetadata.map((info: any, key: number) => {
          const { name, dataURL } = info;
          return (
            <li key={key} className="mt-3" data-testid="custom-file-widget-thumbnail">
              <img className="w-72" src={dataURL} />
              {name}
            </li>
          );
        })}
      </ul>
    );
  };

  const _onChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesInfo = await processFiles(event.target.files);
      if (!isMounted.current) return null;
      setFilesMetadata(filesInfo);
      if (multiple) {
        return onChange(filesInfo.map((fileInfo) => fileInfo.dataURL));
      } else {
        return onChange(filesInfo[0].dataURL);
      }
    }
  };

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <label>
      <div className="cursor-pointer w-max px-4 py-2 border border-cloud-200 rounded-lg mt-3 hover:bg-cloud-100">
        <Upload className="inline mr-4 text-cerulean-500" />
        <p className="inline text-cerulean-500 font-medium">{options.text ?? "Upload Button"}</p>
      </div>
      <FilesInfo />
      <input
        id={id}
        className="hidden"
        type="file"
        onChange={_onChange}
        disabled={readonly || disabled}
        defaultValue=""
        autoFocus={autofocus}
        multiple={multiple}
        accept={(options.accept as string) ?? undefined}
        data-testid="custom-file-widget"
      />
    </label>
  );
};

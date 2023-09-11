import { BiBarcodeReader } from "react-icons/bi";
import { BarcodePluginProps } from "./Html5BarcodeScanner";
import {
  Html5Qrcode,
  Html5QrcodeCameraScanConfig,
  Html5QrcodeFullConfig,
  Html5QrcodeSupportedFormats,
  QrcodeErrorCallback,
  QrcodeSuccessCallback,
} from "html5-qrcode";
import { useCallback, useEffect, useRef, useState } from "react";

interface CustomBarcodeScannerProps {
  config: Html5QrcodeCameraScanConfig;
  verbose?: boolean;
  successCallback: QrcodeSuccessCallback;
  errorCallback: QrcodeErrorCallback;
  formatsToSupport: Html5QrcodeSupportedFormats[];
}

const barcodeScannerContainerName = "custom-barcode-scanner";

const CustomBarcodeScanner = ({
  config,
  verbose,
  formatsToSupport,
  successCallback,
  errorCallback,
}: CustomBarcodeScannerProps) => {
  const [isScanning, setIsScanning] = useState(false);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  // const [error, setError] = useState<string | null>(null);

  const startScanning = () => {
    if (!scannerRef.current) {
      const scanner = new Html5Qrcode(barcodeScannerContainerName, {
        verbose: verbose,
        formatsToSupport: formatsToSupport,
      });
      scannerRef.current = scanner;
    }

    const scannerDiv = document.getElementById(barcodeScannerContainerName);

    scannerDiv!.style.width = "100vw";
    scannerDiv!.style.height = "100vh";
    // scannerDiv!.style.display = "block";

    scannerRef.current
      .start(
        { facingMode: "environment" },
        config,
        (decodedText, decodedResult) => {
          successCallback(decodedText, decodedResult);
          stopScanning();
        },
        errorCallback
      )
      .then(
        () => {
          setIsScanning(true);

          // scannerDiv!.style.position = "fixed";
          // scannerDiv!.style.top = "0";
          // scannerDiv!.style.left = "0";

          // document.createElement("div");
        },
        (err) => {
          console.error(err);
        }
      );
  };

  const stopScanning = () => {
    if (scannerRef.current) {
      document.getElementById(barcodeScannerContainerName)!.style.display =
        "none";
      scannerRef.current
        .stop()
        .then(() => {
          // QR Code scanning is stopped.
          setIsScanning(false);
        })
        .catch((err) => {
          // Stop failed, handle it.
          console.log("Failed to stop scanning");
          console.error(err);
          // setError(err);
        });
    }
  };

  return (
    <>
      <div
        id={barcodeScannerContainerName}
        className={"" + (!isScanning ? "" : "")}
      ></div>
      {!isScanning ? (
        <button
          type="button"
          className="text-3xl h-auto"
          onClick={startScanning}
        >
          Start Scanning
        </button>
      ) : (
        <button
          type="button"
          onClick={stopScanning}
          className="absolute bottom-20 z-10 bg"
        >
          Stop scanning
        </button>
      )}
      {/* <p className="absolute top-16 z-10">
        {isScanning ? "Is Scanning" : "Not scanning"}
      </p> */}
      {/* {error && <p className="absolute right-9">{error}</p>} */}
    </>
  );
};

export default CustomBarcodeScanner;

import {
  Html5QrcodeSupportedFormats,
  QrcodeSuccessCallback,
} from "html5-qrcode";
// import Html5BarcodePlugin from "../components/Html5BarcodeScanner";
import CustomBarcodeScanner from "../components/CustomBarcodeScanner";

const ScannerPage = () => {
  const onNewScanResult: QrcodeSuccessCallback = (
    decodedText,
    decodedResult
  ) => {
    console.log("Scanned!");
    console.log(decodedText);
    console.log(decodedResult);
  };

  return (
    <div className="w-screen h-screen text-lg">
      <CustomBarcodeScanner
        config={{
          fps: 10,
          qrbox: (viewFinderWidth, viewFinderHeight) => {
            console.log(viewFinderWidth, viewFinderHeight);
            return {
              width: viewFinderWidth * 0.8,
              height: viewFinderHeight * 0.6,
              // width: 500,
              // height: 400,
            };
          },
          disableFlip: false,
        }}
        formatsToSupport={[
          Html5QrcodeSupportedFormats.UPC_A,
          Html5QrcodeSupportedFormats.UPC_E,
        ]}
        verbose={true}
        successCallback={onNewScanResult}
        errorCallback={(err) => {
          console.error(err);
        }}
      />
    </div>
  );
};

export default ScannerPage;

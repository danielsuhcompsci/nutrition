import {
  Html5QrcodeSupportedFormats,
  QrcodeSuccessCallback,
} from "html5-qrcode";
// import Html5BarcodePlugin from "../components/Html5BarcodeScanner";
import CustomBarcodeScanner from "../components/scanner/CustomBarcodeScanner";
import trpc from "../trpc/client";
import { useNavigate } from "react-router-dom";
import { getIdByUpc } from "../trpc/helpers";
import Button from "../components/Button";
import { BsArrowLeftCircle } from "react-icons/bs";
import { useState } from "react";

//         react router
//  search page | scanner page

const ScannerPage = () => {
  const navigate = useNavigate();
  const [notFound, setNotFound] = useState(false);

  const onNewScanResult: QrcodeSuccessCallback = (
    decodedText
    // decodedResult
  ) => {
    // console.log("Scanned!");
    // console.log(decodedText);
    // console.log(decodedResult);

    getIdByUpc(decodedText)
      .then((results) => {
        const id: number = results[0].fdc_id;
        if (id) {
          console.log("fdc_id: ", id);
          navigate(`/food/${id}`);
        } else {
          setNotFound(true);
          setTimeout(() => {
            setNotFound(false);
          }, 4000);
        }
      })
      .catch((err) => {
        setNotFound(true);
        setTimeout(() => {
          setNotFound(false);
        }, 4000);
        console.log("Error in scan result:", err);
      });
  };

  return (
    <div className="w-screen h-screen text-lg flex justify-center items-center">
      {notFound && (
        <div className="absolute border border-red-200 bg-red-400 rounded-lg p-2">
          We couldn't find that UPC in our database
        </div>
      )}
      <Button
        onClick={() => {
          navigate("../");
        }}
        className="border-0 absolute top-20 left-20"
      >
        <BsArrowLeftCircle />
      </Button>
      <CustomBarcodeScanner
        config={{
          fps: 10,
          qrbox: (viewFinderWidth, viewFinderHeight) => {
            // console.log(viewFinderWidth, viewFinderHeight);
            return {
              width: viewFinderWidth * 0.9,
              height: viewFinderHeight * 0.9,
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
          // console.error(err);
        }}
      />
    </div>
  );
};

export default ScannerPage;

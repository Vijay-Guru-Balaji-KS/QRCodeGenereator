import { useState } from "react";


export const QRCode = () => { 

  const [image,setimage] = useState("")
  const [loading,setloading] = useState(false)
  const [qrdata, setqrdata] = useState("Vijay")
  const [qrsize,setqrsize] = useState("150")
  const [qrname, setqrname] = useState("qrCode.png")

  async function generateQR()
  {
    setloading(true)
    try {
      const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrsize}x${qrsize}&data=${qrdata}`;
      setimage(url);
    } catch (error) {
      console.error("Error in generating the QR code",error);
    }
    finally
    {
      setloading(false)
    }
  }
  function downloadQR()
  {
    fetch(image).then((response)=>response.blob()).then((blob)=>{
      const link = document.createElement("a");
      link.href=URL.createObjectURL(blob);
      link.download=qrname;
      document.body.appendChild(link);
      link.click();
      document.removeChild(link);
    })
  }

  return (
    <div className="app-container">
    <h1>QR CODE GENERATOR</h1>
    {loading && <p>Please Wait...</p>}
    {image && <img src={image} className="qr-code-image"/>}
        <div>
            <label htmlFor="dataName" className="input-label">
                Name of the QR:
            </label>
            <input type="text" id="dataName" placeholder="Enter QR Name"
              onChange={(e)=>setqrname(e.target.value)}
            />
            <label htmlFor="dataInput" className="input-label">
                Data for QR Code:
            </label>
            <input type="text" id="dataInput" placeholder="Enter data for QR Code"
              onChange={(e)=>setqrdata(e.target.value)}
            />
            <label htmlFor="sizeInput" className="input-label">
                Image size (eg., 150):
            </label>
            <input type="text" id="sizeInput" placeholder="Enter Image Size"
              onChange={(e)=>setqrsize(e.target.value)}
            />
            <button className="generate-button" disabled={loading} onClick={generateQR}>Generate QR Code</button>
            <button className="download-button" onClick={downloadQR}>Download QR Code</button>
        </div>
    </div>
  )
}

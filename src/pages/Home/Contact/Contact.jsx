import "leaflet/dist/leaflet.css";
import { FaLocationDot } from "react-icons/fa6";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { MdEmail } from "react-icons/md";
import { FaGithub, FaPhoneAlt, FaTwitter } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import HomeHeading from "./../../../components/HomeHeading/HomeHeading";

const Contact = () => {
  const position = [23.82106, 90.394636];
  return (
    <div className="container mx-auto">
      <div className="mt-16">
        <HomeHeading
          heading="Contact Us"
          subheading="We align leaders around a shared purpose and strategic story that
            catalyzes their business and brand to take action."
        ></HomeHeading>
        <div className="flex flex-col lg:flex-row mt-12 gap-4">
          <div className="flex-1 grid-cols-1 grid md:grid-cols-2 lg:grid-cols-2 gap-2 mx-3 lg:mx-0">
            <div className="text-center bg-blue-500 text-white p-8 py-16 rounded-2xl">
              <FaLocationDot className="flex justify-center w-full text-6xl mb-4"></FaLocationDot>
              <h3 className="text-3xl font-bold mb-3">Address:</h3>
              <p>144/11, Matikata, Dhaka Cantonment</p>
            </div>
            <div className="text-center bg-blue-500 text-white py-16 rounded-2xl">
              <MdEmail className="flex justify-center w-full text-6xl mb-4"></MdEmail>
              <h3 className="text-3xl font-bold mb-3">Email:</h3>
              <p>mahbubsarwar5@gmail.com</p>
            </div>
            <div className="text-center bg-blue-500 text-white py-16 rounded-2xl">
              <FaPhoneAlt className="flex justify-center w-full text-6xl mb-4"></FaPhoneAlt>
              <h3 className="text-3xl font-bold mb-3">Phone:</h3>
              <p>01820909803</p>
            </div>
            <div className="text-center bg-blue-500 text-white py-16 rounded-2xl">
              <h3 className="text-3xl font-bold mb-3">Contact Us</h3>
              <p className="px-8 my-6">
                Contact us for a quote. Help or to join the team.
              </p>
              <div className="flex gap-3 justify-between px-28 text-3xl">
                <FaFacebook></FaFacebook>
                <FaTwitter></FaTwitter>
                <FaGithub></FaGithub>
              </div>
            </div>
          </div>
          <div className="mx-3 flex-1">
            <MapContainer
              className="w-full lg:w-[600px] h-[600px]"
              center={position}
              zoom={13}
              scrollWheelZoom={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={position}>
                <Popup>HostelMania</Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

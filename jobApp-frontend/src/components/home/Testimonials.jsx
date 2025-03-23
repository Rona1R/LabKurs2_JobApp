import React from "react";
import {
  MDBCarousel,
  MDBCarouselItem,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";

const testimonialsData = [
  {
    id: 1,
    name: "Maria Kate",
    role: "Photographer",
    quote:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus et deleniti nesciunt sint eligendi reprehenderit reiciendis, quibusdam illo, beatae quia fugit consequatur laudantium velit magnam error. Consectetur distinctio fugit doloremque.",
    image: "https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(10).webp",
    rating: 4,
  },
  {
    id: 2,
    name: "John Doe",
    role: "Web Developer",
    quote:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus et deleniti nesciunt sint eligendi reprehenderit reiciendis.",
    image: "https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(32).webp",
    rating: 4,
  },
  {
    id: 3,
    name: "Anna Deynah",
    role: "Web Developer",
    quote:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus et deleniti nesciunt sint eligendi reprehenderit reiciendis, quibusdam illo, beatae quia fugit consequatur laudantium velit magnam error. Consectetur distinctio fugit doloremque.",
    image: "https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(1).webp",
    rating: 4,
  },
];

export default function Testimonials() {
  return (
    <div style={{ width: "100%", padding: "60px 10px" }}>
      <MDBCarousel showControls dark>
        {testimonialsData.map((testimonial) => (
          <MDBCarouselItem
            key={testimonial.id}
            className={`text-center ${testimonial.id === 1 ? "active" : ""}`}
          >
            <img
              src={testimonial.image}
              alt="avatar"
              className="rounded-circle shadow-1-strong mb-4"
              style={{ width: "150px",margin:"0 auto" }}
            />
            <MDBRow className="d-flex justify-content-center">
              <MDBCol lg="8">
                <h2 className="mb-3">{testimonial.name}</h2>
                <p>{testimonial.role}</p>
                <h4 className="text-muted">
                  <MDBIcon fas icon="quote-left" className="pe-2" />
                  {testimonial.quote}
                </h4>
              </MDBCol>
            </MDBRow>
            <ul className="list-unstyled d-flex justify-content-center text-warning mb-0">
              {Array.from({ length: 5 }).map((_, index) => (
                <li key={index}>
                  <MDBIcon
                    fas={index < testimonial.rating}
                    far={index >= testimonial.rating}
                    icon="star"
                    size="sm"
                  />
                </li>
              ))}
            </ul>
          </MDBCarouselItem>
        ))}
      </MDBCarousel>
    </div>
  );
}

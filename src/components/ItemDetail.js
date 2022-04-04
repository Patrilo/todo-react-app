import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const ItemDetail = (props) => {
  let { id } = useParams();

  return (
    <div>
      <Link style={{ position: "fixed", top: "20px", left: "50px" }} to="/">
        volver a la home
      </Link>
      <p>Estas en la pagina {id}</p>
    </div>
  );
};

export default ItemDetail;

import React, { useEffect, useState } from "react";
import { url, getFile, getReport } from "../endPoint";
import CreateFile from "./CreateFile";
import axios from "axios";
import Cookies from "cookie-universal";
import { CHICK_IN, CHICK_OUT, DELETE_FILE } from "./Service";
import { Button, Col, Row } from "react-bootstrap";
import Badge from "react-bootstrap/Badge";
import ListGroup from "react-bootstrap/ListGroup";
import SideBare from "../../Components/SideBare";
import Downlod from "../../Components/Downlod";
import { BsFillFileTextFill, BsFillTrashFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import EditFile from "./Edit-File";

export default function Files() {
  const pathSegments = window.location.pathname.split("/");
  const id = pathSegments.slice(-1)[0];
  const [file_id, setFileId] = useState([]);
  const cookies = Cookies();
  const token = cookies.get("token");
  const [state, setState] = useState([]);
  const [is_admin, setIs_admin] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .post(
        `${url}/${getFile}`,
        { repo_id: id },
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      .then((e) => {
        setState(e.data.data.files);
        setIs_admin(e.data.data.is_admin);
      });
  }, []);

  const handleItemClick = (itemId) => {
    const updatedItems = state.map((item) => {
      if (item.id === itemId) {
        return {
          ...item,
          selected: !item.selected,
        };
      }
      return item;
    });
    setState(updatedItems);
    const selectedIds = updatedItems
      .filter((item) => item.selected)
      .map((item) => item.id); // الحصول على المعرفات المحددة
    setFileId(selectedIds); // تحديث قيمة المصفوفة file_id
  };

  const getData =
    state &&
    state.map((data, index) => (
      <>
        <ListGroup as="ol" key={index} className=" w-75">
          <ListGroup.Item
            onClick={() => handleItemClick(data.id)}
            style={{
              backgroundColor: data.selected ? "#f0f0f0" : "white",
              marginTop: "3px",
            }}
            as="li"
            className=" p-4"
          >
            <div className=" d-flex justify-content-between">
              <span className="fw-bold">{data.name}</span>

              <span>
                {is_admin === 1 ? (
                  <>
                    <EditFile id={data.id} token={token} status={data.status} />
                    <span
                      onClick={() => {
                        DELETE_FILE(data.id);
                      }}
                    >
                      <BsFillTrashFill
                        style={{ marginLeft: "3px" }}
                        color="cadetblue"
                      />
                    </span>
                  </>
                ) : (
                  ""
                )}
                <span className=" border rounded-circle m-1">
                  <Downlod data={data.id} />
                  <span className=" text-black-50">{data.download_count}</span>
                </span>
                <Badge bg="primary" style={{ marginLeft: "3px" }} pill>
                  {data.status}
                </Badge>
              </span>
            </div>
          </ListGroup.Item>
        </ListGroup>
      </>
    ));

  const ChickIn = () => {
    if (file_id.length === 0) {
      window.alert("please choose the files you want chick in");
    } else {
      CHICK_IN(id, file_id);
    }
  };
  const ChickOut = () => {
    if (file_id.length === 0) {
      window.alert("please choose the files you want chick out");
    } else {
      CHICK_OUT(id, file_id);
    }
  };
  return (
    <>
      <BsFillFileTextFill
        id={id}
        token={token}
        url={url}
        getReport={getReport}
        className="report"
        onClick={() => navigate(`/Report/${id}`)}
      />
      <Row>
        <Col xs={5} md={3}>
          <SideBare id={id} token={token} is_admin={is_admin} />
        </Col>
        <Col xs={10} md={8}>
          {getData}
        </Col>
      </Row>
      {is_admin === 1 ? <CreateFile id={id} /> : ""}
      <Button className="chick_in" variant="primary" onClick={() => ChickIn()}>
        chick in
      </Button>
      <Button
        className="chick_out"
        variant="secondary"
        onClick={() => ChickOut()}
      >
        chick out
      </Button>
    </>
  );
}

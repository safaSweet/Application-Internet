import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  BsFillFileEarmarkFill,
  BsFillTrash3Fill,
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import "../../App.css";
import { Rep } from "./Slice_Repo";
import { DeleteRepo } from "./Service";
import CreateFolder from "./CreateFolder";
import { Card, Col, Container, Row } from "react-bootstrap";

export default function Folders() {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const dataRepo = useSelector((state) => state.Repo.data.content);
  const current_page = useSelector((state) => state.Repo.data.current_page);
  const last_page = useSelector((state) => state.Repo.data.last_page);
  const handlePageChangePlus = () => {
    dispatch(Rep( current_page + 1));
  };
  const handlePageChangeMinus = () => {
    dispatch(Rep(current_page - 1));
  };
  useEffect(() => {
    dispatch(Rep());
  }, [dispatch]);

  const showData =
    dataRepo &&
    dataRepo.map((data) => (
      <Container>
        <Row style={{ marginLeft: "25%" }}>
          <Card
          className='card_repo'
            key={data.id}
          >
            <Col>
              <BsFillFileEarmarkFill
                onClick={() => nav(`Files/${data.id}`, { replace: true })}
                style={{
                  fontSize: "28px",
                  color: "cadetblue",
                  marginBottom: "8px",
                }}
              />
              <h5 className="font-weight-bold mb-3">{data.name}</h5>
              {data.is_admin === 1 ? (
                <span className="icons text-start m-3 ">
                  <BsFillTrash3Fill
                    style={{ fontSize: "15px", color: "gray" }}
                    onClick={() => DeleteRepo(data.id)}
                  />
                </span>
              ) : (
                ""
              )}
            </Col>
          </Card>
        </Row>
      </Container>
    ));

  return (
    <>
      <div>
        <ul>
          <section>
            <div className="container">
              <div
                className="row row-cols-lg-3 row-cols-md-2 row-cols-1 text-center justify-content-center px-xl-6 aos-init aos-animate"
                data-aos="fade-up"
              >
                {showData}
              </div>
            </div>
          </section>
        </ul>

        <div className=" text-center">
          <BsFillArrowLeftCircleFill
            color="cadetblue"
            cursor="pointer"
            onClick={handlePageChangeMinus}
            disabled={current_page === 1}
          />
          <span className=" m-4">
            Page {current_page} of {last_page}
          </span>
          <BsFillArrowRightCircleFill
            color="cadetblue"
            cursor="pointer"
            onClick={handlePageChangePlus}
            disabled={current_page === last_page}
          />
        </div>
      </div>

      <CreateFolder />
    </>
  );
}

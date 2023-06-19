import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import FormControl from "./Form";
import Button from "../common/Button";

export default function ModalCreate(props) {
  const [show, setShow] = useState(false);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [isDescriptionValid, setIsDescriptionValid] = useState(false);

  function handleClose() {
    setShow(false);
  }

  function handleShow() {
    setShow(true);
    setCategory(props.category);
  }

  function handleChange(evt) {
    const { name, value } = evt.target;
    if (name === "description") {
      setDescription(value);
      setIsDescriptionValid(value !== "");
    } else if (name === "amount") {
      const amountValue = value.replace(/\./g, "").replace(/,/g, "");
      setAmount(parseFloat(amountValue.toLocaleString()));
    } else if (name === "date") {
      setDate(value);
    } else if (name === "category") {
      setCategory(value);
    }
  }

  function addItem() {
    if (isDescriptionValid) {
      const data = {
        description: description,
        amount: amount,
        date: date,
        category: category,
      };
      props.action(data);
      setShow(false);

      // Mengatur ulang nilai input menjadi kosong
      setDescription("");
      setAmount(0);
      setDate("");
      setCategory("");
      setIsDescriptionValid(false);
    } else {
      alert("Mohon masukkan deskripsi!");
    }
  }

  return (
    <>
      <Button
        text={props.text}
        type="submit"
        variant={props.variant}
        onClick={handleShow}
        icon={props.icon}
      />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.modalheading}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <FormControl
              desc="Deskripsi"
              type="text"
              placeholder="Masukan Deskripsi"
              name="description"
              value={description}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <FormControl
              desc="Nominal"
              type="text"
              placeholder="Masukan Nominal"
              name="amount"
              value={isNaN(amount) ? "" : amount.toLocaleString()}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <FormControl
              desc="Tanggal"
              type="date"
              placeholder="Masukan Tanggal"
              name="date"
              value={date}
              onChange={handleChange}
            />
          </div>
          <div>
            <FormControl
              type="hidden"
              name="date"
              value={category}
              onChange={handleChange}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            text="Save"
            type="submit"
            variant={props.variant}
            onClick={addItem}
            icon="bi bi-bookmark-plus-fill"
          />
        </Modal.Footer>
      </Modal>
    </>
  );
}

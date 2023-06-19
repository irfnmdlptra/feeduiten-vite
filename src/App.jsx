import React, { useEffect, useState } from "react";
import "./App.css";
import ModalCreate from "./components/layout/Modal";
import Alert from "./components/common/Alert";
import Header from "./components/layout/Header";
import SummaryCard from "./components/layout/SummaryCard";
const App = () => {
  const [sisaUang, setSisaUang] = useState(0);
  const [persentaseUang, setPersentaseUang] = useState(0);
  const [pemasukanUang, setPemasukanUang] = useState(0);
  const [pengeluaranUang, setPengeluaranUang] = useState(0);
  const [transaksiIN, setTransaksiIN] = useState(0);
  const [transaksiOUT, setTransaksiOUT] = useState(0);
  const [summary, setSummary] = useState([]);

  const tambahItem = (objek) => {
    let newData = [...summary, objek];
    let dataUangIN = newData.filter((item) => item.category === "IN");
    let nominalUangIN = dataUangIN.map((item) => item.amount);
    let jumlahUangIN = nominalUangIN.reduce((total, num) => total + num, 0);

    let dataUangOUT = newData.filter((item) => item.category === "OUT");
    let nominalUangOUT = dataUangOUT.map((item) => item.amount);
    let jumlahUangOUT = nominalUangOUT.reduce((total, num) => total + num, 0);
    let persenUang = ((jumlahUangIN - jumlahUangOUT) / jumlahUangIN) * 100;

    setPemasukanUang(jumlahUangIN);
    setTransaksiIN(nominalUangIN.length);
    setPengeluaranUang(jumlahUangOUT);
    setTransaksiOUT(nominalUangOUT.length);
    setSisaUang(jumlahUangIN - jumlahUangOUT);
    setPersentaseUang(Math.round(persenUang));
    setSummary(newData);
  };

  useEffect(() => {
    if (summary.length > 0) {
      fnHitung();
    }

    const storedState = localStorage.getItem("state");

    if (storedState) {
      const parsedState = JSON.parse(storedState);
      setSisaUang(parsedState.sisaUang);
      setPersentaseUang(parsedState.persentaseUang);
      setPemasukanUang(parsedState.pemasukanUang);
      setPengeluaranUang(parsedState.pengeluaranUang);
      setTransaksiIN(parsedState.transaksiIN);
      setTransaksiOUT(parsedState.transaksiOUT);
      setSummary(parsedState.summary);
    } else {
      fnHitung();
    }
  }, []);

  useEffect(() => {
    const stateToStore = {
      sisaUang,
      persentaseUang,
      pemasukanUang,
      pengeluaranUang,
      transaksiIN,
      transaksiOUT,
      summary,
    };

    localStorage.setItem("state", JSON.stringify(stateToStore));
  }, [
    sisaUang,
    persentaseUang,
    pemasukanUang,
    pengeluaranUang,
    transaksiIN,
    transaksiOUT,
    summary,
  ]);

  const fnHitung = () => {
    let dataUangIN = summary.filter((item) => item.category === "IN");
    let nominalUangIN = dataUangIN.map((item) => item.nominal);
    let jumlahUangIN = nominalUangIN.reduce((total, num) => total + num, 0);

    let dataUangOUT = summary.filter((item) => item.category === "OUT");
    let nominalUangOUT = dataUangOUT.map((item) => item.nominal);
    let jumlahUangOUT = nominalUangOUT.reduce((total, num) => total + num, 0);
    let persenUang = ((jumlahUangIN - jumlahUangOUT) / jumlahUangIN) * 100;

    setPemasukanUang(jumlahUangIN);
    setTransaksiIN(nominalUangIN.length);
    setPengeluaranUang(jumlahUangOUT);
    setTransaksiOUT(nominalUangOUT.length);
    setSisaUang(jumlahUangIN - jumlahUangOUT);
    setPersentaseUang(Math.round(persenUang));
  };

  return (
    <div className="container py-5">
      <Header sisa={sisaUang.toLocaleString()} persen={persentaseUang} />

      <div className="row mt-4">
        {/* <SummaryCard title="Pemasukan" nominal={pemasukanUang.toLocaleString()} transaksi={transaksiIN}/> */}
        <div className="col-6">
          <div className="card-wrapper p-4">
            <div className="icon-wrapper-in box-sh">
              <i className="bi bi-wallet2" aria-hidden="true"></i>
            </div>
            <span className="title-sm">Pemasukan</span>
            <h3 className="fw-bold">Rp. {pemasukanUang.toLocaleString()} ,</h3>
            <div>
              <span className="title-sm text-ungu fw-bold">{transaksiIN} </span>
              <span className="title-sm"> Transaksi</span>
            </div>
          </div>
        </div>

        <div className="col-6">
          <div className="card-wrapper p-4 ">
            <div className="icon-wrapper-out box-sh">
              <i className="bi bi-cash-stack"></i>
            </div>
            <span className="title-sm">Pemakaian</span>
            <h3 className="fw-bold">
              Rp. {pengeluaranUang.toLocaleString()} ,
            </h3>
            <div>
              <span className="title-sm text-ungu fw-bold">
                {transaksiOUT}{" "}
              </span>
              <span className="title-sm"> Transaksi</span>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-12 d-flex align-items-center justify-content-between">
          <h4>Ringkasan Transaksi</h4>
          <div className="wrapper-button d-flex">
            <ModalCreate
              action={tambahItem}
              category="IN"
              variant="button btn-ungu px-3 py-2 me-2 box-sh"
              text="Pemasukan"
              icon="bi bi-plus-circle ms-1"
              modalheading="Tambahkan Pemasukan"
            />
            <ModalCreate
              action={tambahItem}
              category="OUT"
              variant="button btn-pink px-3 py-2 box-sh"
              text="Pengeluaran"
              icon="bi bi-dash-circle-dotted ms-1"
              modalheading="Tambahkan Pengeluaran"
            />
          </div>
        </div>
      </div>

      <div className="row mt-4">
        {summary.length < 1 && <Alert />}
        {summary.map((sum, index) => {
          return (
            <div
              key={index}
              className="col-12 d-flex mb-3 justify-content-between align-items-center"
            >
              <div className="d-flex align-items-center">
                <div
                  className={
                    sum.category === "IN"
                      ? "icon-wrapper-in box-sh"
                      : "icon-wrapper-out box-sh"
                  }
                >
                  <i
                    className={
                      sum.category === "IN" ? "bi bi-wallet2" : "bi bi-bag-dash"
                    }
                    aria-hidden="true"
                  ></i>
                </div>
                <div className="transaction ms-3 d-flex flex-column">
                  <h5>{sum.description} </h5>
                  <span className="title-sm">{sum.date} </span>
                </div>
              </div>
              <h6 className={sum.category === "IN" ? "money-in" : "money-out"}>
                Rp. {sum.amount.toLocaleString()}{" "}
              </h6>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;

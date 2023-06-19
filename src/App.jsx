import React, { useEffect, useState } from "react";
import "./App.css";
import ModalCreate from "./components/layout/Modal";
import Header from "./components/layout/Header";
import SummaryCard from "./components/layout/SummaryCard";
import SummaryList from "./components/layout/SummaryList";
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
        <SummaryCard
          title="Pemasukan"
          nominal={pemasukanUang.toLocaleString()}
          transaksi={transaksiIN}
        />
        <SummaryCard
          title="Pemakaian"
          nominal={pengeluaranUang.toLocaleString()}
          transaksi={transaksiOUT}
          string={" "}
        />
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

      <SummaryList summary={summary} />

      
    </div>
  );
};

export default App;

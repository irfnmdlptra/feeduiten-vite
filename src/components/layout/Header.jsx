export default function Header(props) {
  return (
    <>
      <div className="row">
        <div className="col-12 text-center">
          <h1 className="fw-bold">FEEDUITEN APPS</h1>
          <hr className="w-75 mx-auto" />
          <h2 className="fw-bold">Rp. {props.sisa} ,</h2>
          <span className="title-sm">
            Sisa uang kamu tersisa {props.persen}% lagi
          </span>
        </div>
      </div>
    </>
  );
}

import PropTypes from "prop-types";

function DummyPlaceholder({ name = "No Image" }) {
  return (
    <div className="dummy-image w-[45rem] h-[25rem] bg-gray-400/25 shadow-sm flex items-center justify-center rounded-xl relative overflow-clip">
      <span className="bg-slate-600/30 w-[90vh] h-56 rotate-45 absolute left-2"></span>
      <span className="bg-slate-400/30 w-[90vh] h-36 rotate-45 absolute left-2"></span>
      <p className="font-bold text-3xl text-slate-900 absolute z-10">
        {name}
      </p>
    </div>
  );
}

DummyPlaceholder.propTypes = {
  name: PropTypes.string.isRequired,
};

export default DummyPlaceholder;

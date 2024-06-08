import PropTypes from 'prop-types';

const DashboardTitle = (title) => {
  return (
    <div className="bg-[#fdf9ff] border-b border-[var(--clr-light-gray)] py-6 px-10 text-center pl-16">
          <h3>{title}</h3>
        </div>
  );
};

DashboardTitle.propTypes={
  title: PropTypes.string
}

export default DashboardTitle;
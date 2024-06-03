import PropTypes from 'prop-types';

const SectionTitle = ({title}) => {
  return (
    <header className="text-center">
      <h2>{title}</h2>
      <div className="bg-[var(--clr-focussed)] h-1 w-28 mx-auto mt-4"></div>
    </header>
  );
};

SectionTitle.propTypes = {
  title: PropTypes.string
}

export default SectionTitle;

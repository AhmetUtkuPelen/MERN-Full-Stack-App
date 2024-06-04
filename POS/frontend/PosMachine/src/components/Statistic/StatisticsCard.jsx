import PropTypes from 'prop-types';



function StatisticsCard({title,amount,image}) {
  return (
<>
<div className="card-item bg-gray-950 p-8 rounded-lg">
              <div className="flex gap-x-4">
                <div className="rounded-full bg-white w-28 h-28 p-3">
                  <img src={image} />
                </div>
                <div className="text-white">
                  <p className="mb-2 text-2xl font-bold text-orange-600">{title}</p>
                  <p className="text-2xl font-bold text-gray-100">{amount}</p>
                </div>
              </div>
</div>      
</>
  )
}

export default StatisticsCard


StatisticsCard.propTypes = {
    amount: PropTypes.string.isRequired,
    title:PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  };
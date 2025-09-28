
const Heading = ({label, textColor="black"}) => {
  return (
    <div className="p-4">
      <h1 className={`text-center font-bold text-4xl p-2 text-${textColor}`}>{label}</h1>
    </div>
  )
}

export default Heading
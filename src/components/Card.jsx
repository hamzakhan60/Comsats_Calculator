



const Card = ({ name, icon:Icon, color }) => {
    return (
        <>
            <div
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-1 group">
                <div className={`${color} w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="text-white" size={24} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{name}</h3>
                <p className="text-gray-600 text-sm">Calculate and track your academic performance</p>
            </div>
        </>
    )

}

export default Card;
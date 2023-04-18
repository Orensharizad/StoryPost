
function ProfileFollowers() {
    return (
        <div className='flex items-center justify-around space-x-2 py-3 md:py-0  '>
            <div className='flex items-center space-x-2'>
                <span className='font-bold'>87</span>
                <p>Posts</p>
            </div>
            <div className='flex items-center space-x-2'>
                <span className='font-bold'>870</span>
                <p>followers</p>
            </div>
            <div className='flex items-center space-x-2'>
                <span className='font-bold'>557</span>
                <p>following</p>
            </div>
        </div>

    )
}

export default ProfileFollowers
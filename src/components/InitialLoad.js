import ReactLoading from 'react-loading';
export default function InitialLoad() {
    return (
        <div className="flex justify-center items-center h-screen">
            <div>
                <ReactLoading type={'spin'} color={'black'} height={'30%'} width={'30%'} className='mx-auto m-2' />
                <p className='text-center'>
                    Waiting for your whereabouts while we load the potato servers.
                </p>
            </div>
        </div>
    );
}
import { DotWave } from '@uiball/loaders'

export default function Loader() {
    return (
        <div aria-live="polite" className='w-full h-screen flex items-center justify-center mx-auto' >
            <DotWave />
        </div>
    )
}
import { useEffect } from 'react';

const OnRefresh = (isActive) => {
    console.log('OnRefresh called, isActive:', isActive); // 👈 add this

    useEffect(() => {
        if (!isActive) return;
        console.log('effect running, will attach listener'); // 👈 add this too

        const handleBeforeUnload = (e) => {
            console.log('beforeunload fired');
            e.preventDefault();
            e.returnValue = '';
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, [isActive]);
};

export default OnRefresh;
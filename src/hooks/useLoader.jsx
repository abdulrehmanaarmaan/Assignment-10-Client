import React, { useCallback, useState } from 'react';

const useLoader = () => {
    const [loading, setLoading] = useState(false);

    const startLoading = useCallback(() => setLoading(true), []);

    const stopLoading = useCallback(() => setLoading(false), []);

    return { loading, startLoading, stopLoading }
};

export default useLoader;
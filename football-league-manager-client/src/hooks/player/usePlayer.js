import { useEffect, useState } from "react";

import { getPlayerById } from "../../services/playerService";

export function usePlayer(id) {

    const [player, setPlayer] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    useEffect(() => {

        async function loadPlayer() {

            try {

                setLoading(true);

                const data = await getPlayerById(id);

                setPlayer(data);

                setError("");

            }
            catch (err) {

                setError(

                    err.message ??

                    "Failed to load player."

                );

            }
            finally {

                setLoading(false);

            }

        }

        if (id) {

            loadPlayer();

        }

    }, [id]);

    return {

        player,

        loading,

        error

    };

}
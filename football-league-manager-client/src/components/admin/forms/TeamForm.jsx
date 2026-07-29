import FormCard from "../../common/Form/FormCard";

import Input from "../../common/Input/Input";
import Select from "../../common/Select/Select";
import Button from "../../common/Button/Button";
import ErrorAlert from "../../common/ErrorAlert/ErrorAlert";

function TeamForm({
    form,
    leagues,
    managers
}) {

    return (

        <FormCard
            title="Create Team"
            subtitle="Create a new football team."
            hideHeader={!!form.successMessage}
        >

            {

                form.successMessage ? (

                    <div className="form-success">

                        <h2>✓</h2>

                        <p>

                            {form.successMessage}

                        </p>

                    </div>

                ) : (

                    <form
                        className="form"
                        onSubmit={form.handleSubmit}
                    >

                        <ErrorAlert
                            message={form.generalError}
                        />

                        <Input
                            label="Team Name"
                            name="name"
                            value={form.formData.name}
                            onChange={form.handleChange}
                            placeholder="Manchester United"
                            error={form.errors.name}
                        />

                        <Input
                            label="City"
                            name="city"
                            value={form.formData.city}
                            onChange={form.handleChange}
                            placeholder="Manchester"
                            error={form.errors.city}
                        />

                        <Input
                            label="Country"
                            name="country"
                            value={form.formData.country}
                            onChange={form.handleChange}
                            placeholder="England"
                            error={form.errors.country}
                        />

                        <Select
                            label="League"
                            name="leagueId"
                            value={form.formData.leagueId}
                            onChange={form.handleChange}
                            placeholder="Select league"
                            options={leagues.map(league => ({

                                value: league.id,

                                label: league.name

                            }))}
                            error={form.errors.leagueId}
                        />

                        <Select
                            label="Manager"
                            name="managerId"
                            value={form.formData.managerId}
                            onChange={form.handleChange}
                            placeholder="No manager available"
                            options={managers.map(manager => ({

                                value: manager.id,

                                label: manager.username

                            }))}
                            error={form.errors.managerId}
                        />

                        <Button
                            type="submit"
                            variant="filled"
                        >

                            Create Team

                        </Button>

                    </form>

                )

            }

        </FormCard>

    );

}

export default TeamForm;
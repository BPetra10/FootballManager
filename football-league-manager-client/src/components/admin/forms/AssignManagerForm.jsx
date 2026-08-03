import FormCard from "../../common/Form/FormCard";
import Select from "../../common/Select/Select";
import Button from "../../common/Button/Button";
import ErrorAlert from "../../common/ErrorAlert/ErrorAlert";

function AssignManagerForm({

    form,

    managers,

    teams

}) {

    const disabled =
        managers.length === 0 ||
        teams.length === 0;

    return (

        <FormCard
            title="Assign Manager"
            subtitle="Assign a manager to a team."
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

                        <Select
                            label="Manager"
                            name="managerId"
                            value={form.formData.managerId}
                            onChange={form.handleChange}
                            placeholder="Select manager"
                            options={managers.map(manager => ({

                                value: manager.id,
                                label: manager.username

                            }))}
                            error={form.errors.managerId}
                        />

                        <Select
                            label="Team"
                            name="teamId"
                            value={form.formData.teamId}
                            onChange={form.handleChange}
                            placeholder="Select team"
                            options={teams.map(team => ({

                                value: team.id,
                                label: team.name

                            }))}
                            error={form.errors.teamId}
                        />

                        <Button
                            type="submit"
                            variant="filled"
                            disabled={disabled}
                        >

                            Assign Manager

                        </Button>

                    </form>

                )

            }

        </FormCard>

    );

}

export default AssignManagerForm;
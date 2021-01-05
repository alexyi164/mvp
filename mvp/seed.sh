DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd)"

DATABASE="boarddash"
USER="alexyi164"

OUTPUT="all-states.csv"
FILEPATH="$DIR/$OUTPUT"

SCHEMA="$DIR/schema.sql"
psql -U $USER < $SCHEMA

psql -U $USER -d $DATABASE -c "COPY allstates(date,state,death,negative,positive,positiveCasesViral,positiveIncrease,totalTestResults) FROM '$FILEPATH' CSV HEADER";

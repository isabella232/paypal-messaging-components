if [[ "$DIRTY_SNAPSHOTS" != "1" ]]; then
    npm run test:func

    echo ''
    echo 'DIFF FILES FOUND'
    find ./tests/functional/ -type f -name '*png' | grep -h __diff_output__
    echo ''
    echo 'ORIGINAL AND DIFF PNG FILES FOUND'
    find ./tests/functional/ -type f -name '*png'
    echo ''

    node ./tests/functional/utils/collectDiffs.js
elif [[ "$TRAVIS_PULL_REQUEST" = "false" ]] && [[ "$TRAVIS_BRANCH" = "develop" ]]; then
    npm run test:func -- -u

    # Uses GNU sed syntax
    sed -i -e 's/DIRTY_SNAPSHOTS=1/DIRTY_SNAPSHOTS=0/g' .travis.yml

    git remote set-url origin "https://${GH_TOKEN}@github.com/${TRAVIS_REPO_SLUG}.git"

    git checkout develop
    git add .
    git commit -m "chore(snapshots): update snapshots [skip ci]"
    git push
fi

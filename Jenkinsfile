pipeline
{
    agent
    {
        node
        {
            label 'master'
            customWorkspace 'D:\\Source\\VNU_FE\\WS'
        }
    }
    environment
    {
        removeWithoutFiles = "_config;"
        iis_folder = getIISFolder()
        site_name = getSiteName()
    }
    options
    {
        buildDiscarder( logRotator( daysToKeepStr: '365', numToKeepStr: '10') )
    }
    stages
    {
        stage("Build")
        {
            when
            {
                branch 'release'
            }
            steps
            {
                script
                {
                    echo "========Building========"
                    sh 'cd ./ASCVN.VNU.HRM; yarn install; npm run production'
                    numberChangeAssetsFolder = Integer.parseInt(sh(returnStdout: true, script: 'git diff --name-only HEAD@{1}..HEAD@{0} ./ASCVN.VNU.HRM/src/assets | wc -l').trim())
                    if (numberChangeAssetsFolder == 0) 
                    {
                        sh 'rm -rf ./ASCVN.VNU.HRM/dist/hrm/assets'
                        removeWithoutFiles += "assets;"
                    }
                    sh 'rm -rf ./ASCVN.VNU.HRM/dist/hrm/_config'
                }                
            }
        }
        stage("Deploy")
        {
            when
            {
                expression { GIT_BRANCH ==~ /(release|staging)/ }
            }
            steps
            {
                script
                {
                    echo "========Deploying========"
                    
                    sh '''
                        ./ASCVN.VNU.HRM/remove-file.sh ${iis_folder}* \'${removeWithoutFiles}\' ;
                        ./ASCVN.VNU.HRM/remove-file.sh ${iis_folder}APTN/* \'${removeWithoutFiles}\' ;
                    '''

                    bat "%windir%\\system32\\inetsrv\\appcmd stop apppool /apppool.name:${site_name} || exit"    
                    powershell("""\$status = Get-WebsiteState -name "${site_name}"
                    do { Start-Sleep -s 1; } while ( "\$status.Value" -eq "Started" ) """)
                        
                    sh '''
                        cp -r ./ASCVN.VNU.HRM/dist/hrm/* ${iis_folder} ;
                        cp -r ./ASCVN.VNU.HRM/dist/hrm/* ${iis_folder}APTN/ ;
                        sed -i 's@<base href="/"@<base href="/APTN/"@g' ${iis_folder}APTN/index.html          
                    '''

                    bat "%windir%\\system32\\inetsrv\\appcmd start apppool /apppool.name:${site_name} || exit"
                }
            }
        }
    }
}

def getSiteName() {
    if(GIT_BRANCH == "staging")
    {
        return "TK.VNU.FE.HRM"
    }
    return "DEV.VNU.HRM.FE"
}

def getIISFolder() {
    if(GIT_BRANCH == "staging")
    {
        return "/d/VNU/TK/FE/HRM/"
    }
    return "/d/VNU/DEV/FE/HRM/"
}
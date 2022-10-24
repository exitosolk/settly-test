<?php

namespace App\Console\Commands;
use Illuminate\Console\Command;
use Mail;
use App\Mail\WeeklyMail;
use App\Models\Clients;

class AutoWeeklyEmail extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'auto:weeklyemail';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $clients = Clients::all();

        if ($clients->count() > 0) {
            foreach ($clients as $client) {
                Mail::to($client)->send(new WeeklyMail($client));
            }
        }

        return 0;
    }
}
